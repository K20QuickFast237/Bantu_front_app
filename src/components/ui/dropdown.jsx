import React, { useEffect, useRef, useState } from 'react';

export default function Dropdown({ trigger, children, align = 'end', className = '' }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target) && triggerRef.current && !triggerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    function onEsc(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onEsc);
    };
  }, []);

  const toggle = (e) => {
    e?.stopPropagation();
    setOpen((s) => !s);
  };

  const close = () => setOpen(false);

  const clonedTrigger = trigger
    ? React.cloneElement(trigger, {
        ref: triggerRef,
        onClick: (e) => {
          if (typeof trigger.props.onClick === 'function') trigger.props.onClick(e);
          toggle(e);
        },
      })
    : null;

  const defaultItemClass = 'w-full text-left px-4 py-2 text-sm hover:bg-muted/10 cursor-pointer';

  return (
    <div className="relative inline-block">
      {clonedTrigger}
      {open && (
        <div
          ref={menuRef}
          className={`absolute mt-2 z-50 min-w-[12rem] bg-white border rounded-md shadow-lg ${align === 'end' ? 'right-0' : 'left-0'} ${className}`}
        >
          <div className="flex flex-col py-1">{React.Children.map(children, (child) => {
            if (!React.isValidElement(child)) return child;
            const isStringTag = typeof child.type === 'string';
            const skipDefault = !!child.props['data-no-default'];
            const childClass = isStringTag && !skipDefault ? [child.props.className, defaultItemClass].filter(Boolean).join(' ') : child.props.className;
            const propsToAdd = {
              onClick: (e) => {
                if (typeof child.props.onClick === 'function') child.props.onClick(e);
                close();
              }
            };
            if (childClass) propsToAdd.className = childClass;
            return React.cloneElement(child, propsToAdd);
          })}</div>
        </div>
      )}
    </div>
  );
}
