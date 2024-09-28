import ShowFlights from "./ShowFlights";

const Flights = () => {
    return (
        <>
            <h1 style={{textAlign : 'center', color:'white', marginTop:'1rem' , marginBottom: '1rem', padding:'1rem'}}>Google Flights</h1>
            <div className='container' display='flex' style={{backgroundColor:'#0b0b0d'}}>
                <div className='flights' display='block'>
                    <ShowFlights/>
                </div>
            </div>
        </>
    )
}

export default Flights
