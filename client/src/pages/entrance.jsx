//The intended landing page of the site, purely for thematics. Only includes a link to the login.

export default function Entrance() {
    return (
        <main>
            <div className="table">
                <div className="dm-card left-bench">LEFT-BENCH</div>
                <div className="dm-card left">LEFT</div>
                <div className="dm-card left-diag">LEFT-DIAG</div>
                <div className="dm-card center">CENTER</div>
                <div className="dm-card right-diag">RIGHT-DIAG</div>
                <div className="dm-card right">RIGHT</div>
                <div className="dm-card right-bench">RIGHT-BENCH</div>
            </div>
        </main>
    );
}