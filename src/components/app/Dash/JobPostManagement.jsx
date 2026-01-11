import React, { useState, useEffect } from "react";
import { Eye, Pencil, Trash, Share2, Search, MapPin, ChevronLeft, Calendar } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import api from "@/services/api";
import BantulinkLoader from "@/components/ui/BantulinkLoader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

const JobPostManagement = () => {
  const { t } = useTranslation();
  const [jobPosts, setJobPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({ titre_poste: "", remuneration_min: "" });
  const [openDialog, setOpenDialog] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    searchTerm: "",
    status: "",
    startDate: "",
    endDate: "",
  });
  const [filteredJobPosts, setFilteredJobPosts] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get("/mesoffres");
        console.log(res.data.data);
        setJobPosts(res.data || []);
      } catch (err) {
        toast.error(t('jobPostManagement.errorLoad'));
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    let filtered = jobPosts.filter((job) => {
      const searchTermMatch =
        !filters.searchTerm ||
        job.titre_poste.toLowerCase().includes(filters.searchTerm.toLowerCase());

      const statusMatch =
        !filters.status || job.statut === filters.status;

      const jobDate = new Date(job.date_publication);
      const startDateMatch =
        !filters.startDate || jobDate >= new Date(filters.startDate);
      const endDateMatch =
        !filters.endDate || jobDate <= new Date(filters.endDate);

      return searchTermMatch && statusMatch && startDateMatch && endDateMatch;
    });
    setFilteredJobPosts(filtered);
  }, [filters, jobPosts]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      searchTerm: "",
      status: "",
      startDate: "",
      endDate: "",
    });
    setFilteredJobPosts(jobPosts);
  };


  const handleUpdate = (job) => {
    setSelectedJob(job);
    setFormData({
      titre_poste: job.titre_poste || "",
      remuneration_min: job.remuneration_min || "",
    });
    setOpenDialog(true);
  };

  const submitUpdate = async () => {
    try {
      await api.put(`/offres/${selectedJob.id}`, formData);
      setJobPosts(
        jobPosts.map((job) =>
          job.id === selectedJob.id ? { ...job, ...formData } : job
        )
      );
      setOpenDialog(false);
    } catch (err) {
      console.error(err);
    }
  };

  const confirmDelete = (job) => {
    setSelectedJob(job);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await api.delete(`/offres/${selectedJob.id}`);
      setJobPosts(jobPosts.filter((job) => job.id !== selectedJob.id));
      setIsDeleteModalOpen(false);
      setSelectedJob(null);
    } catch (err) {
      console.error(err);
    }
  };


  const renderListView = () => (
    <div className="font-sans relative overflow-hidden">
      {/* Hero Section */}
      <div className="bg-[#FFF3EB] px-4 sm:px-8 pb-32 pt-12 relative">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-[#10B981] text-2xl md:text-3xl font-bold">{t('jobPostManagement.title')}</h1>
          <p className="text-sm md:text-base font-semibold mt-1">
            {t('jobPostManagement.subtitle')}
          </p>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 -mt-24 relative z-10">
        <div className="shadow-xl rounded-xl overflow-hidden bg-white/90">
          {/* Filter Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            className="overflow-hidden border border-white/10 backdrop-blur-sm bg-white/90"
          > 
            <div className="flex flex-wrap gap-4 items-end p-4 bg-white/90">
              <div className="flex items-center flex-1 min-w-[180px] border border-gray-200 bg-white px-4 py-2 rounded-lg">
                  <Search className="text-gray-400 w-5 h-5 mr-3 flex-shrink-0" />
                  <Input id="searchTerm" name="searchTerm" type="text" placeholder={t('jobPostManagement.searchPlaceholder')} value={filters.searchTerm} onChange={handleFilterChange} className="w-full outline-none text-sm md:text-base min-w-0 bg-transparent border-none focus:ring-0" />
              </div>
              <div className="flex items-center flex-1 min-w-[150px] border border-gray-200 bg-white px-4 py-2 rounded-lg">
                  <MapPin className="text-gray-400 w-5 h-5 mr-3 flex-shrink-0" />
                  <select id="status" name="status" value={filters.status} onChange={handleFilterChange} className="w-full outline-none text-sm md:text-base min-w-0 bg-transparent border-none appearance-none">
                      <option value="">{t('jobPostManagement.statusAll')}</option>
                      <option value="active">{t('jobPostManagement.statusActive')}</option>
                      <option value="inactive">{t('jobPostManagement.statusInactive')}</option>
                  </select>
              </div>
              <div className="flex items-center flex-1 min-w-[150px] border border-gray-200 bg-white px-4 py-2 rounded-lg">
                  <Calendar className="text-gray-400 w-5 h-5 mr-3 flex-shrink-0" />
                  <Input id="startDate" name="startDate" type="date" value={filters.startDate} onChange={handleFilterChange} className="w-full outline-none text-sm md:text-base min-w-0 bg-transparent border-none focus:ring-0" />
              </div>
              <div className="flex items-center flex-1 min-w-[150px] border border-gray-200 bg-white px-4 py-2 rounded-lg">
                  <Calendar className="text-gray-400 w-5 h-5 mr-3 flex-shrink-0" />
                  <Input id="endDate" name="endDate" type="date" value={filters.endDate} onChange={handleFilterChange} className="w-full outline-none text-sm md:text-base min-w-0 bg-transparent border-none focus:ring-0" />
              </div>
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold" type="button" onClick={handleResetFilters}>
                  {t('jobPostManagement.resetFilters')}
              </button>
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div className="grid grid-cols-2 md:grid-cols-4 bg-white border border-gray-200">
            {[
              {title: jobPosts.length, subtitle: t('jobPostManagement.stats.created')},
              {title: '0', subtitle: t('jobPostManagement.stats.applications')},
              {title: '0', subtitle: t('jobPostManagement.stats.active')},
              {title: '00', subtitle: t('jobPostManagement.stats.inactive')}
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="p-6 border-r border-gray-200 last:border-none hover:bg-gray-50 transition-all duration-200"
              >
                <p className="text-2xl md:text-3xl text-center font-bold text-gray-800">{stat.title}</p>
                <p className="text-sm md:text-base text-center font-medium text-gray-600 mt-2">
                  {stat.subtitle}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <main className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex justify-end mb-8">
            <Button onClick={() => navigate('/createJob')} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded">
              {t('jobPostManagement.createButton')}
            </Button>
          </div>

          {/* Table */}
          {renderTable()}
        </main>
      </div>
    </div>
  );

  const renderTable = () => (
      <div className="overflow-x-auto border border-gray-300 rounded">
        {loading ? (
          <div className="text-center py-10"><BantulinkLoader /></div>
        ) : (
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300">
              <th className="px-6 py-3 text-left font-semibold text-gray-700">{t('jobPostManagement.table.title')}</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">{t('jobPostManagement.table.publication')}</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">{t('jobPostManagement.table.deadline')}</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">{t('jobPostManagement.table.status')}</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">{t('jobPostManagement.table.applications')}</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">{t('jobPostManagement.table.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobPosts.length > 0 ? (
              filteredJobPosts.map((job, idx) => (
              <tr key={job.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-6 py-4 text-green-600 font-medium">
                  {job.titre_poste}
                </td>
                <td className="px-6 py-4 text-gray-700">{job.date_publication ? new Date(job.date_publication).toLocaleDateString('fr-FR') : 'N/A'}</td>
                <td className="px-6 py-4 text-gray-700">{job.date_limite_soumission ? new Date(job.date_limite_soumission).toLocaleDateString('fr-FR') : 'N/A'}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${job.statut === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className="text-gray-700 capitalize">{job.statut || 'N/A'}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-700 font-medium cursor-pointer hover:text-blue-500">
                  <Link to={`/dashboard_candidature_spec/${job.id}`}>
                    {job.candidatures_count || '0'} {t('jobPostManagement.table.applicationsCount')}
                  </Link>
                </td>
                <td className="px-6 py-4 flex items-center gap-2">
                  <Button size="sm" variant="outline" className="text-green-500 border-green-500 hover:bg-green-50 hover:text-green-600" onClick={() => navigate(`/job-post/${job.id}`)}>
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="text-orange-500 border-orange-500 hover:bg-orange-50 hover:text-orange-600" onClick={() => handleUpdate(job)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => confirmDelete(job)}>
                    <Trash className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            )) 
            ): (
                <tr>
                  <td colSpan="6" className="text-center text-gray-500 py-10">{t('jobPostManagement.table.empty')}</td>
                </tr>
              )}
          </tbody>
        </table>
      )}  
      </div>
  );
  
  return (
    <main className="flex-1 overflow-auto">
      <motion.div
        key="list"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {renderListView()}
      </motion.div>
      {/* Modal de mise à jour */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('pages.jobPostDetail.editModalTitle')}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <label className="block mb-1 text-sm font-medium">{t('pages.jobPostDetail.jobTitle')}</label>
              <Input
                value={formData.titre_poste}
                onChange={(e) => setFormData({ ...formData, titre_poste: e.target.value })}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">{t('pages.jobPostDetail.minSalary')}</label>
              <Input
                type="number"
                value={formData.remuneration_min}
                onChange={(e) =>
                  setFormData({ ...formData, remuneration_min: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter className="mt-4 flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              {t('pages.jobPostDetail.cancel')}
            </Button>
            <Button onClick={submitUpdate}>{t('pages.jobPostDetail.save')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de confirmation de suppression */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('pages.jobPostDetail.confirmDeleteTitle')}</DialogTitle>
            <DialogDescription>
              <span dangerouslySetInnerHTML={{ __html: t('pages.jobPostDetail.confirmDeleteDesc', { title: selectedJob?.titre_poste }) }} />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">{t('pages.jobPostDetail.cancel')}</Button>
            </DialogClose>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              {t('pages.jobPostDetail.delete')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default JobPostManagement;
//           </DialogHeader>
//           <DialogFooter>
//             <DialogClose asChild>
//               >
//     </main<Button variant="outline">{t('pages.jobPostDetail.cancel')}</Button>
//             </DialogClose>
  
//           <Button variant="destructive" onClick={handleConfirmDelete}>
//               {t('pages.jobPostDetail.delete')}
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </main>
//   );
// };

// export default JobPostManagement;