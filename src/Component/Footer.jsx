
const Footer = () => {
    const footerStyle = {
        left: 0,
        bottom: 0,
        width: '100%',
        height: '7rem',
        backgroundColor: 'rgb(26 27 35 / 96%)',
        color: 'white',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    return (
        <>
            <div className="container" style={footerStyle}>
                <h5 style={{ marginTop: '5rem', marginBottom: '5rem' }}>@ Copyrights by Google</h5>
            </div>
        </>
    )
}

export default Footer
