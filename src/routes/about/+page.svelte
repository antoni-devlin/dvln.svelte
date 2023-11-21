<script>
  import { onMount } from "svelte";
  import BookCard from "$lib/BookCard.svelte";

  let userId = "105494066543086834878"; //My Google Books userId - this is publically available
  let fields =
    "fields=items(id,volumeInfo(title,authors,publishedDate,description,pageCount,imageLinks(thumbnail),infoLink)";

  async function getBooks(bookshelfId) {
    let queryString = `https://www.googleapis.com/books/v1/users/${userId}/bookshelves/${bookshelfId}/volumes?${fields})`;
    let response = await fetch(queryString);
    return response.json();
  }
  let booklist = [];
  function constructBooks(jsonResponse) {
    let fetchedBooks = jsonResponse["items"].map((o) => ({
      id: o.id,
      title: o.volumeInfo.title,
      authors: o.volumeInfo.authors,
      publishedDate: o.volumeInfo.publishedDate,
      description: o.volumeInfo.description,
      pageCount: o.volumeInfo.pageCount,
      thumbnail: o.volumeInfo.imageLinks.thumbnail,
      infoLink: o.volumeInfo.infoLink,
    }));
    booklist = booklist.concat(fetchedBooks);

    return fetchedBooks;
  }

  onMount(async () => constructBooks(await getBooks(4)));
</script>

<h1>About</h1>

<p>
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, nam
  aliquid incidunt dolor eveniet error et magnam porro alias numquam omnis
  animi, eos quia, voluptates velit rem ratione perspiciatis nulla!
</p>

<div>
  {#each booklist as book}
    <BookCard
      title={book.title}
      author={book.authors}
      thumb={book.thumbnail}
      desc={book.description}
      infoLink={book.infoLink}
    />
  {/each}
</div>

<style>
  div {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(25vw, 1fr));
    column-gap: 50px;
  }
</style>
