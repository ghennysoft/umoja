export default function DashboardFooter() {
  return (
    <footer className="bg-primary text-on-primary py-2 md:py-3 px-4 md:px-8 flex flex-col sm:flex-row justify-between items-center text-xs md:text-sm z-10 shrink-0 border-t border-white/10 gap-2 md:gap-0">
      <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-8">
        <div className="flex items-center gap-2">
          <span className="material-icons-outlined text-base">verified_user</span>
          <div>
            <p className="font-semibold">Sécurisé et fiable</p>
            <p className="text-[10px] md:text-xs text-white/70">Données protégées</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="material-icons-outlined text-base">group</span>
          <div>
            <p className="font-semibold">256 membres actifs</p>
            <p className="text-[10px] md:text-xs text-white/70">Rejoignez-nous !</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 text-right">
        <span className="material-icons text-yellow-400 text-base">favorite</span>
        <div>
          <p className="font-semibold">UMOJA YETU ASBL</p>
          <p className="text-[10px] md:text-xs text-white/70">L'union fait la force</p>
        </div>
      </div>
    </footer>
  )
}