export function Injuries(data) {
    data.length > 0 && (
        <td className={data === dataInjuriesHome ? "border-right" : ""}>
          <div className="inner-section p-4">
            <div className='grid grid-cols-2 gap-6'>
              {data.map((item) => (
                <div className='player__injuries' key={item.playerId}>
                  <img className="player_logo mr-2" src={item.photo} alt={item.name} />
                  <p className='text-left'>{item.name} <br /> <span className='reasonInjure'>{item.reasonInjure}</span> </p>
                </div>
              ))}
            </div>
          </div>
        </td>
    )
}    

export function translatePlayers(players) {
  // group position
  const grouped = {
    GK: [],
    DEF: [],
    MID: [],
    FWD: [],
  };

  players?.forEach((player) => {
    switch (player.position) {
        case "GK":
            grouped.GK.push(player);
            break;
        case "DEF":
        case "CB":
        case "LB":
        case "RB":
            grouped.DEF.push(player);
            break;
        case "MID":
        case "CM":
        case "CDM":
            grouped.MID.push(player);
            break;
        case "FWD":
        case "RW": 
        case "ST": 
        case "LW":
            grouped.FWD.push(player);
            break;
        default:
            break;
    }
  });

  // render HTML for each position
  const renderGroup = (group, positionLabel) => {
    return group.length > 0 ? (
        <p className='flex items-center flex-wrap mt-2'>{positionLabel}: {group.map((player) => player.name).join(', ')}</p>
    ) : null;
  };

  return (
    <>
      {renderGroup(grouped.FWD, "Tiền đạo")}
      {renderGroup(grouped.MID, "Tiền vệ")}
      {renderGroup(grouped.DEF, "Hậu vệ")}
      {renderGroup(grouped.GK, "Thủ môn")}
    </>
  );
};



export function Loading() {
    return (
        <div className="overflow-hidden">
            <div className="loading show">
                <div className="loading-inner">
                    <h2 className="loader"></h2>
                </div>
            </div>
        </div>
    )
}    