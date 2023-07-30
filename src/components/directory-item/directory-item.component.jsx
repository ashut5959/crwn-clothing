import { useNavigate } from "react-router-dom";
import "./directory-item.styles.scss";

const DirectoryItem = ({ category }) => {
  const navigate = useNavigate();
  const { id, imageUrl, title } = category;
  const navigateHandle = () => {
    navigate(`/shop#${title}`);
  };
  return (
    <div key={id} className="directory-container" onClick={navigateHandle}>
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="directory-body-container">
        <h2>{title}</h2>
        <p>Show Now</p>
      </div>
    </div>
  );
};
export default DirectoryItem;
