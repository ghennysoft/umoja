'use client'

import Image from 'next/image'

const transactions = [
  {
    initials: 'JD',
    name: 'Jean Dupont',
    type: 'Cotisation Mensuelle',
    amount: '+50 $',
    date: "Aujourd'hui",
    color: 'bg-secondary-container text-on-secondary-container'
  },
  {
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANOAUzPtbWegEpoEkx7dEd6kKHqqO7jClbXmQfquBGT5bwR45D84_sRYcE8KYEoTt8w7BWbaZ7vsK-s95fJxenAlHRpMUxSXG-VLolHCEa8OJbBB26fFO9BPvL31Tj6ZN99-2O12U4l8vfm6OGMFCjhV7n_Boxuoc50BhsJHl_G5uNGS120G_O4ZBJUIcGB1WQAH4mGP-PriB-Tepy-iPJYQ6LYyDMC7MfEMAf5-4XaOiQHGSTTXcJQUWk_tsgFtQaiTOuRTcw2OI',
    name: 'Marie Claire',
    type: 'Don Spécial',
    amount: '+200 $',
    date: 'Hier'
  },
  {
    initials: 'PK',
    name: 'Paul Kalonji',
    type: 'Cotisation Annuelle',
    amount: '+500 $',
    date: '22 Mai 2024',
    color: 'bg-tertiary-container text-on-tertiary-container'
  },
  {
    initials: 'SL',
    name: 'Sarah Lukusa',
    type: 'Cotisation Mensuelle',
    amount: '+50 $',
    date: '20 Mai 2024',
    color: 'bg-secondary-container text-on-secondary-container'
  }
]

export default function CotisationsTransactions() {
  return (
    <div className="card flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-headline-md text-on-surface">Transactions récentes</h3>
        <a className="text-label-md text-secondary hover:underline" href="#">
          Voir tout
        </a>
      </div>

      <div className="space-y-4 flex-1 overflow-y-auto pr-2">
        {transactions.map((transaction, index) => (
          <div key={index} className="transaction-item">
            <div className="flex items-center gap-3">
              {transaction.avatar ? (
                <Image
                  alt={transaction.name}
                  className="w-10 h-10 rounded-full object-cover shrink-0"
                  src={'/logo.png'}
                  width={40}
                  height={40}
                />
              ) : (
                <div className={`w-10 h-10 rounded-full ${transaction.color} flex items-center justify-center shrink-0 font-bold`}>
                  {transaction.initials}
                </div>
              )}
              <div>
                <p className="text-body-md font-bold text-on-surface">{transaction.name}</p>
                <p className="text-label-md text-on-surface-variant">{transaction.type}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-body-md font-bold text-secondary">{transaction.amount}</p>
              <p className="text-label-md text-on-surface-variant">{transaction.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}