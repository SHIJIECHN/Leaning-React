import Header from '../components/Header'
import Footer from '../components/Footer'
import Main from '../components/Main'

class Home extends React.Component {
    render() {
        return (
            <div className="page-home" >
                <Header />
                <br />
                <Main />
                <hr />
                <Footer />
                <hr />
            </div >
        )
    }
}

export default Home;