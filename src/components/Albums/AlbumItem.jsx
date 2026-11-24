import { Link, useOutletContext } from "react-router-dom";
import ItemRow from "../common/ItemRow";
import ItemActions from "../common/ItemActions";

// One album row: id, title, a link to its photos, and Delete.
export default function AlbumItem({ album, onDelete }) {
  const { username } = useOutletContext(); // the logged-in user, from UserPage
  const photosUrl = `/${username}/albums/${album.id}/photos`;

  function deleteAlbum() {
    onDelete(album.id);
  }

  return (
    <li className="item-card">
      <ItemRow itemId={album.id}>
        <span className="item-title">{album.title}</span>
        <ItemActions onDelete={deleteAlbum}>
          <Link to={photosUrl}>View photos</Link>
        </ItemActions>
      </ItemRow>
    </li>
  );
}
