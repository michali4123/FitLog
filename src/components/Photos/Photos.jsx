import { Link, Navigate, useParams } from "react-router-dom";
import { useUser } from "../../js/hooks/useUser";
import { useServerList } from "../../js/hooks/useServerList";
import { PHOTO_FIELDS } from "../../js/config/fields";
import ItemForm from "../common/ItemForm";
import ErrorMessage from "../common/ErrorMessage";
import ListView from "../common/ListView";
import PhotoItem from "./PhotoItem";
import "../../css/Photos/Photos.css";

const PHOTOS_PER_PAGE = 4; // כמה תמונות לטעון כל פעם

// the small picture (thumbnail) is the same picture as the big one
function addThumbnail(photoValues) {
  return { ...photoValues, thumbnailUrl: photoValues.url };
}

// Photos page of one album: loads the photos part by part.
// The album id comes from the URL: /:username/albums/:albumId/photos
export default function Photos() {
  const { id: userId, username } = useUser().user; // the logged-in user, from UserContext
  const { albumId } = useParams();
  // the album is asked together with the user id,
  // so the server returns it ONLY if it belongs to the logged-in user
  const albumSearch = useServerList("albums", { id: albumId, userId }, "album");
  const photos = useServerList("photos", { albumId }, "photo", PHOTOS_PER_PAGE);

  const album = albumSearch.items[0];
  const albumsUrl = `/${username}/albums`;

  // the album does not exist, or it belongs to another user -> back to my albums
  const isNotMyAlbum = !albumSearch.isLoading && !albumSearch.errorMessage && !album;
  if (isNotMyAlbum) return <Navigate to={albumsUrl} replace />;

  function addPhoto(newPhotoValues) {
    return photos.addItem({ albumId: Number(albumId), ...addThumbnail(newPhotoValues) });
  }

  function updatePhoto(photoId, changedValues) {
    return photos.updateItem(photoId, addThumbnail(changedValues));
  }

  function renderPhoto(photo) {
    return (
      <PhotoItem key={photo.id} photo={photo} onUpdate={updatePhoto} onDelete={photos.deleteItem} />
    );
  }

  const albumTitle = album ? album.title : "Album";
  const loadMoreText = photos.isLoadingMore ? "Loading..." : "Load more";
  // all the photos are already on the screen
  const isEndOfAlbum = !photos.isLoading && !photos.hasMore && photos.items.length > 0;

  return (
    <section className="page">
      <div className="photos-header">
        <Link to={albumsUrl}>← All albums</Link>
        <h2>{albumTitle}</h2>
      </div>

      <ItemForm
        fields={PHOTO_FIELDS}
        submitText="Add photo"
        onSubmit={addPhoto}
        className="card inline-form photo-form"
      />

      <ErrorMessage message={albumSearch.errorMessage || photos.errorMessage} />

      <ListView
        items={photos.items}
        isLoading={photos.isLoading}
        emptyText="No photos in this album yet."
        renderItem={renderPhoto}
        className="photos-grid"
      />

      {photos.hasMore && (
        <button
          type="button"
          className="photos-more"
          onClick={photos.loadMore}
          disabled={photos.isLoadingMore}
        >
          {loadMoreText}
        </button>
      )}

      {isEndOfAlbum && <p className="end-message">No more photos in this album.</p>}
    </section>
  );
}
