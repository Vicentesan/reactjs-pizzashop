import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-bold">Página não Encontrada</h1>
      <p className="text-accent-foreground">
        Voltar para o{' '}
        <Link
          to="/"
          className="text-sky-500 underline underline-offset-4 dark:text-sky-400"
        >
          dashboard
        </Link>
      </p>
    </div>
  )
}
