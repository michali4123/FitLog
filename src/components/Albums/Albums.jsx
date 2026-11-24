import { useUser } from "../../js/hooks/useUser";
import { useServerList } from "../../js/hooks/useServerList";
import { useSearch } from "../../js/hooks/useSearch";
import { ALBUM_FIELDS, ID_TITLE_SEARCH_OPTIONS } from "../../js/config/fields";
import SearchBar from "../common/SearchBar";
import ItemForm from "../common/ItemForm";
import ErrorMessage from "../common/ErrorMessage";
import ListView from "../common/ListView";
import AlbumItem from "./AlbumItem";

// Main albums page: loads the albums of the logged-in user only.
// Opening an album goes to its own URL: /:username/albums/:albumId/photos
export default function Albums() {
  const { id: userId } = useUser().user; // the logged-in user, from UserContext
  const albums = useServerList("albums", { userId }, "album");
  const search = useSearch(albums.items, "title");

  function addAlbum(newAlbumValues) {
    return albums.addItem({ userId, title: newAlbumValues.title });
  }

  function renderAlbum(album) {
    return <AlbumItem key={album.id} album={album} onDelete={albums.deleteItem} />;
  }

  return (
    <section className="page">
      <h2>My Albums</h2>

      <div className="card toolbar">
        <SearchBar search={search} searchOptions={ID_TITLE_SEARCH_OPTIONS} />
        <ItemForm fields={ALBUM_FIELDS} submitText="Add" onSubmit={addAlbum} className="inline-form" />
      </div>

      <ErrorMessage message={albums.errorMessage} />

      <ListView
        items={search.results}
        isLoading={albums.isLoading}
        emptyText="No albums found."
        renderItem={renderAlbum}
      />
    </section>
  );
}
