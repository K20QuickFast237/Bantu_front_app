import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

// Importer toutes les icônes "brands" pour les rendre disponibles
import * as brandIcons from '@fortawesome/free-brands-svg-icons';

// Créez un objet pour mapper les noms d'icônes à leurs objets
const brandIconsList = Object.keys(brandIcons)
  .filter(key => key !== 'fas' && key !== 'prefix')
  .map(icon => brandIcons[icon]);

// Ajoutez toutes les icônes "brands" à la bibliothèque Font Awesome
library.add(...brandIconsList);

const DynamicFontAwesomeIcon = ({ iconName, ...props }) => {
  if (!iconName) return null;

  // Font Awesome utilise le camelCase (ex: faJava) pour les noms d'icônes,
  // alors que les classes CSS sont en kebab-case (ex: fa-java).
  // Cette fonction convertit "fa-whatever" en "faWhatever".
  const toCamelCase = (str) => {
    return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
  };

  const icon = brandIcons[toCamelCase(iconName)];

  // Si l'icône n'est pas trouvée dans les "brands", on pourrait chercher dans "solid", etc.
  return icon ? <FontAwesomeIcon icon={icon} {...props} /> : null;
};

export default DynamicFontAwesomeIcon;