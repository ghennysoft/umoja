import Image from 'next/image'

const projects = [
  {
    name: 'Éducation des jeunes',
    responsable: 'Marie Dupont',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPsnJF-c-gALMYCOc9FIsP3Kz5EUKdpSpXHSA0niJadvn_ro_DFe7lVCULWdSe8iVcDUYA63TXdb0gUhVKGTzz6p4-HY7cgGAmT66Cf1w2iiGaJGc0MJXeKFQB5h4C4WcSohWVv1bLsp2PGMrGzWjMw56ADSh5P5R05ZonJMRZptalcHpX6SjEUutxZmnGpr4RlUJK4PzgLJ220JC-0rwZnJe0AT-P1ryDhEahEQoB00ByohldmHtlUGwXDOmPkxiMOrtPtAMh_MQ',
    status: 'En cours',
    statusClass: 'badge-success',
    progress: 75,
    endDate: '30 Juin 2024'
  },
  {
    name: 'Santé communautaire',
    responsable: 'John K.',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHUgdB5DCF_N91WcmB5dnTnhvu8kmpny-kQ0U9rTzmjd2UmF0cgwVayA9nQem0gzb4lUB_YROmJK1f2QW66gaD0a1KpYUfQoBKnqe_J-qpYPYlpr9eCyiz_DMuoRHajNA9i2XT3abMxBuJGa_vRivb-RmhWWDe8IweyzYu7CDoK8I4i_dguwK-JQJrD_y1CTf0jhA5yNN9j30egGGTjwmMOArkQrHiEvA0BILo87OY61ZehR7k8ZYck9_RZehGpEp-pAbyW3hVziY',
    status: 'En cours',
    statusClass: 'badge-success',
    progress: 60,
    endDate: '15 Août 2024'
  },
  {
    name: 'Autonomisation des femmes',
    responsable: 'Sophie N.',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkgGeBoTFEfctOH2LKxvPaVbyzrf_MwnF20omj-3vDsobY9jzKauWa-K4-eFMe5kNsUmhTR1WJ0i5QNA2ejhv4xQct6BMJNWcyESTJsowC8ZRP_-55T_rnOay7-dSTL1yqmAh65d3QuHeEnS80XPk5trQVD-Mgxem3heMXrduTtDnzZXSJ0G5AXap2zWldPzWov5p0pXIlQG9rX5JnJdas05vSB_uERM1_hpNLdVXXw4eU-8TrlLQZadpLqerPOZbiXH0Vr0gC9uU',
    status: 'Planifié',
    statusClass: 'badge-blue',
    progress: 30,
    endDate: '20 Sept. 2024'
  },
  {
    name: 'Environnement propre',
    responsable: 'Paul T.',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAICbDz66X3VODRNThV4gA4Wqdgadu6MtWHS4uZ2k-afu58qGxVjdKp5fqTfPKGhKYaMmlhgh0ClRVbXFDDGKAULOFYBPcfeaKiJMztqSs5Llc04536z-3125_9_omfYmJ4Q8-ziVOtwSOeIrx0y34T1BHy71P4s4F_nihKBFo2RpxJuNjWkYtdoy3ryovQNm9kiG97IyAhTg19zZHg8ZR3ivHK1vL9aDvYAzLHJIIxztxss37t4lDxbsqCZh9MTdlDm-RNjuzWS_U',
    status: 'En cours',
    statusClass: 'badge-success',
    progress: 40,
    endDate: '10 Juil. 2024'
  }
]

export default function ProjectsTable() {
  return (
    <div className="lg:col-span-2 card overflow-hidden flex flex-col">
      <div className="p-4 md:p-6 border-b border-outline-variant/30 flex items-center justify-between flex-wrap gap-2">
        <h3 className="text-base md:text-lg font-bold text-on-surface">Projets en cours</h3>
        <button className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
          Voir tous <span className="material-icons-outlined text-sm">expand_more</span>
        </button>
      </div>
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-surface-container/30 text-on-surface-variant text-xs md:text-sm font-semibold border-b border-outline-variant/30">
              <th className="py-3 px-4 md:px-6 font-semibold">Projet</th>
              <th className="py-3 px-4 md:px-6 font-semibold hidden md:table-cell">Responsable</th>
              <th className="py-3 px-4 md:px-6 font-semibold hidden sm:table-cell">Statut</th>
              <th className="py-3 px-4 md:px-6 font-semibold hidden lg:table-cell">Progression</th>
              <th className="py-3 px-4 md:px-6 font-semibold hidden xl:table-cell">Fin prévue</th>
              <th className="py-3 px-4 md:px-6"></th>
            </tr>
          </thead>
          <tbody className="text-xs md:text-sm text-on-surface">
            {projects.map((project, index) => (
              <tr key={index} className="border-b border-outline-variant/10 hover:bg-surface-container/20 transition-colors">
                <td className="py-3 md:py-4 px-4 md:px-6 font-medium">{project.name}</td>
                <td className="py-3 md:py-4 px-4 md:px-6 hidden md:table-cell">
                  <div className="flex items-center gap-2">
                    <Image alt="image" className="w-6 h-6 rounded-full" src={"/logo.png"} width={24} height={24} />
                    <span>{project.responsable}</span>
                  </div>
                </td>
                <td className="py-3 md:py-4 px-4 md:px-6 hidden sm:table-cell">
                  <span className={project.statusClass}>{project.status}</span>
                </td>
                <td className="py-3 md:py-4 px-4 md:px-6 hidden lg:table-cell">
                  <div className="flex items-center gap-2">
                    <span className="font-medium w-8">{project.progress}%</span>
                    <div className="w-16 md:w-24 h-1.5 bg-surface-container rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${project.status === 'Planifié' ? 'bg-blue' : 'bg-secondary'}`} style={{ width: `${project.progress}%` }}></div>
                    </div>
                  </div>
                </td>
                <td className="py-3 md:py-4 px-4 md:px-6 text-on-surface-variant hidden xl:table-cell">{project.endDate}</td>
                <td className="py-3 md:py-4 px-4 md:px-6 text-right">
                  <button className="text-on-surface-variant hover:text-on-surface">
                    <span className="material-icons-outlined">more_vert</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}