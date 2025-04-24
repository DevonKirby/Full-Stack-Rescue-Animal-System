
function App() {
  return (
    <div className="container mt-5 text-white">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">🐾 Rescue Animal System</h1>
        <p className="lead">Manage and view rescued dogs and monkeys</p>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-5 mb-4">
          <div className="card bg-dark text-white h-100 shadow">
            <div className="card-body d-flex flex-column justify-content-between text-center">
              <div>
                <h5 className="card-title">View All Dogs</h5>
                <p className="card-text">See all available and reserved rescue dogs.</p>
              </div>
              <a href="/dogs" className="btn btn-outline-primary mt-3">Go to Dogs</a>
            </div>
          </div>
        </div>

        <div className="col-md-5 mb-4">
          <div className="card bg-dark text-white h-100 shadow">
            <div className="card-body d-flex flex-column justify-content-between text-center">
              <div>
                <h5 className="card-title">View All Monkeys</h5>
                <p className="card-text">See all available and reserved rescue monkeys.</p>
              </div>
              <a href="/monkeys" className="btn btn-outline-success mt-3">Go to Monkeys</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
