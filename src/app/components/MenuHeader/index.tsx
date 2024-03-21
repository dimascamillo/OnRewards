export default function MenuHeader() {
  return (
    <nav>
      <ul className="flex justify-center items-center gap-3">
        <li>
          <a
            className="flex justify-center items-center w-28 h-11 bg-yellow-brand-400 border-yellow-400 border-2 hover:bg-transparent text-white rounded-lg transition-all cursor-pointer"
            href="sign-in"
          >
            Entrar
          </a>
        </li>

        <li>
          <a
            className="flex justify-center items-center w-36 h-11 border-yellow-400 border-2 bg-transparent hover:bg-yellow-brand-400 text-white rounded-lg transition-all cursor-pointer"
            href="/area-do-cliente"
          >
            Área do Cliente
          </a>
        </li>
      </ul>
    </nav>
  );
}
