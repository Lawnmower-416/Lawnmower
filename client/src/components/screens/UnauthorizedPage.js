import Header from "./Header";

function UnauthorizedPage() {
  return (
    <div>
        <Header />
        <h1>Unauthorized</h1>
        <p>You are not authorized to access this page.</p>
    </div>
  );
}

export default UnauthorizedPage;