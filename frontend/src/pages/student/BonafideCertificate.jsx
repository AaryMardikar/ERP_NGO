export default function BonafideCertificate() {
    return (
        <div className="page">
            <div className="page-header">
                <div>
                    <h2>Bonafide Certificate</h2>
                    <p>Download your official bonafide certificate issued by the institution.</p>
                </div>
            </div>

            <div className="panel">
                <p style={{ color: '#94a3b8', marginBottom: '15px' }}>
                    Click the button below to download your bonafide certificate.
                </p>

                <a href="/bonafide_sample.pdf" download>
                    <button className="btn">Download Bonafide Certificate</button>
                </a>
            </div>
        </div>
    );
}
