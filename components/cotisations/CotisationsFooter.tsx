export default function CotisationsFooter() {
  return (
    <footer className="mt-8 border-t border-outline-variant pt-6 pb-2 text-center flex flex-col md:flex-row justify-between items-center text-on-surface-variant gap-4">
      <p className="text-body-md">UMOJA YETU ASBL - L'union fait la force</p>
      <div className="flex gap-4 text-label-md flex-wrap justify-center">
        <span className="flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">security</span>
          Sécurisé et fiable
        </span>
        <span className="flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">lock</span>
          Données protégées
        </span>
      </div>
    </footer>
  )
}