
function BadgeBanner({
  title,
  description,
  extra,
  className,
}) {
  return (
    <div className={`home-page__badge-banner-container ${className ? className : ''}`}>
      <div className="container">
        <div className="d-flex">
          <div className="home-page__badge-banner__wrapper">
            <div
              className="content"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              <div className="title font-ng-medium">
                {title}
              </div>
              {!!description && <div className="description font-ng-regular">{description}</div>}
            </div>

            <div
              className="btn-wrapper"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              {extra}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BadgeBanner;
