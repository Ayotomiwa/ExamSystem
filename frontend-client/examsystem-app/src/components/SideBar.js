
const sideBar = (props) => {
    return (
        <div className="sidebar" style={{maxWidth:"35%"}}>
            <div className="sidebar-content">
                <div className="sidebar-brand">
                    <h2>{props.name}</h2>
                </div>
                <div className="sidebar-body" style={{padding:"5%"}}>
                    <body>{props.children}</body>
                </div>
            </div>
        </div>
    );
}

export default sideBar;