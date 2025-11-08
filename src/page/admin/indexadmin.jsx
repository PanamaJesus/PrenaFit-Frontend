import '../../App'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

function IdxAdmin() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <div className="absolute -top-28 -left-28 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 rounded-full blur-[80px] -z-10"></div>
      <div className="overflow-hidden">
        <Navbar />
         <h2> Hola Admin</h2>
        <Footer />
      </div>
    </main>
  )
}

export default IdxAdmin