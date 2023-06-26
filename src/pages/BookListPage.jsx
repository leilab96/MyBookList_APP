import React, { useEffect, useState } from "react";
import { getBookList, deleteBookFromUser } from "../database";
import Layout from "../custom_items/Layout.jsx";
import { getCurrentUserId } from "../auth.jsx";
import BookItem from "../custom_items/BookItem";
// List books on booklist
const BookListPage = () => {
  const [bookList, setBookList] = useState([]);
  const userId = getCurrentUserId();
  // fetch booklist during render
  useEffect(() => {
    const fetchBookList = async () => {
      try {
        if (userId) {
          const list = await getBookList(userId);
          setBookList(list);
        }
      } catch (error) {
        console.error("Error fetching book list:", error.message);
      }
    };

    fetchBookList();
  }, []);
  // Delete Book from bookList subcollection
  const handleDeleteBook = async (bookId) => {
    try {
      await deleteBookFromUser(userId, bookId);
      setBookList((prevList) => prevList.filter((book) => book.id !== bookId));
      console.log("Book deleted successfully!");
    } catch (error) {
      console.error("Error deleting book:", error.message);
    }
  };
  //map books with BookItem components
  return (
    <Layout>
      <h1 style={styles.heading}>My BookList</h1>
      <div style={styles.container}>
        <ul style={styles.bookList}>
          {bookList.map((book) => (
            <BookItem book={book} onDeleteBook={handleDeleteBook} />
          ))}
        </ul>
      </div>
    </Layout>
  );
};

const styles = {
  heading: {
    textAlign: "center",
    margin: "20px",
    color: "#195DA6",
    fontSize: "24px",
  },

  containter: {
    display: "grid",
    gridTemplateColumns: "repeat(1, 1fr)",
    justifyContent: "center",
    margin: "0 auto",
  },
};
export default BookListPage;
