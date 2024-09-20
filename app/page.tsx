import BookList from "@/components/home/BookList";
import SortList from "@/components/home/SortList";

function HomePage(searchParams: { searchParams: { category: string } }) {
  const category = searchParams.searchParams.category;
  return (
    <section>
      <SortList />
      <BookList sortOption={category} />
    </section>
  );
}

export default HomePage;
