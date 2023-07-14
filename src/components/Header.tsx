export default function Header() {
  return (
    <div className="layout-header">
      <div className="w-[1400px] max-w-[95%] mx-auto">
        <header className="flex items-center justify-between pt-[40px] pb-[30px] px-0">
          <div>
            <h2 className="block text-[32px] font-semibold .no-underline text-white">
              <a href="#">Apikgems</a>
            </h2>
          </div>

          <nav>
            <ul>
              <li>
                <a href="#">Apikgems</a>
              </li>
              <li>
                <a href="#">Apikgems</a>
              </li>
              <li>
                <a href="#">Apikgems</a>
              </li>
              <li className="mr-[150px]">
                <a href="#">Apikgems</a>
              </li>
              <li className="btn">
                <a href="#">Profile</a>
              </li>
            </ul>
          </nav>
        </header>
      </div>
    </div>
  );
}
