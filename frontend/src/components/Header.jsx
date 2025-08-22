import logo from '../assets/logo.png';

const Header = () => {
  return (
    <div className="flex items-center justify-center gap-2 p-4 bg-gray-500/30 backdrop-blur-md border-b border-gray-600/40 rounded-xl shadow-md">
      <img src={logo} alt="Logo" className="w-10 h-10" />
      <h1 className="text-2xl font-bold text-gray-100">ToDo List</h1>
    </div>
  );
}

export default Header;
