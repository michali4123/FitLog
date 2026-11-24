import { Link } from "react-router-dom";
import { useUser } from "../../js/hooks/useUser";
import ItemRow from "../common/ItemRow";
import ItemActions from "../common/ItemActions";

// One album row: id, title, a link to its photos, and Delete.
export default function AlbumItem({ album, onDelete }) {
  const { username } = useUser().user; // the logged-in user, from UserContext
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
