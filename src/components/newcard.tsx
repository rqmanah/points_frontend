import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
function NewCard() {
  return (
    <div>
      <div className="col-xl-3 col-md-6 mb-4">
        <div className="card border border-5 border-primary border-end-0 border-top-0 border-bottom-0 border-left-primary shadow h-100 py-2">
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <div className="text-xs font-weight-bold fs-6 text-primary text-uppercase mb-1">
                  Earnings (Monthly)
                </div>
                <div className="h5 mb-0 fw-bold text-gray-800">$40,000</div>
              </div>
              <div className="col-auto">
                <CalendarTodayIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewCard;
