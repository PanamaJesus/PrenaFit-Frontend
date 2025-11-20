import '../../App.css'
import NavbarE from './NavEmb'
import Footer from '../../components/Footer'

function IdxEmb() {
  return (
   <main className="min-h-screen w-full overflow-x-hidden flex flex-col">
  <div className="absolute -top-28 -left-28 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 rounded-full blur-[80px] -z-10"></div>
  <NavbarE />
  <div className="flex-1 w-full px-6 py-10">
    <h2 className="text-3xl font-bold">Hola Preñada</h2>
  </div>

  <Footer />
</main>

  )
}

export default IdxEmb
