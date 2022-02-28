"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Books",
      [
        {
          name: "First book name",
          description:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis, cupiditate quos?",
          price: 100,
          rating: 5,
          img: "book.jpg",
          authorId: 1,
          genreId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Second book name",
          description:
            "Dolor harum veritatis aliquid eius esse omnis unde similique perspiciatis, quidem, tempore totam quaerat nostrum officia odit molestias dicta. Perspiciatis, cupiditate quos?",
          price: 200,
          rating: 4,
          img: "book.jpg",
          authorId: 2,
          genreId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Third book name",
          description:
            "Perspiciatis, cupiditate quos? Dolor harum veritatis aliquid eius esse omnis unde similique perspiciatis, quidem, tempore totam quaerat nostrum officia odit molestias dicta. ",
          price: 300,
          rating: 2,
          img: "book.jpg",
          authorId: 1,
          genreId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Fourth book name",
          description:
            "Dolor harum veritatis aliquid eius esse omnis unde similique. Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
          price: 400,
          rating: 9,
          img: "book.jpg",
          authorId: 2,
          genreId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Fifth book name",
          description:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor harum veritatis aliquid eius esse omnis unde similique perspiciatis, quidem, tempore totam quaerat nostrum officia odit molestias dicta. Perspiciatis, cupiditate quos?",
          price: 500,
          rating: 3,
          img: "book.jpg",
          authorId: 2,
          genreId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "book name 1",
          description:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis, cupiditate quos?",
          price: 100,
          rating: 5,
          img: "book.jpg",
          authorId: 1,
          genreId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "book name 2",
          description:
            "Dolor harum veritatis aliquid eius esse omnis unde similique perspiciatis, quidem, tempore totam quaerat nostrum officia odit molestias dicta. Perspiciatis, cupiditate quos?",
          price: 200,
          rating: 4,
          img: "book.jpg",
          authorId: 2,
          genreId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "book name 3",
          description:
            "Perspiciatis, cupiditate quos? Dolor harum veritatis aliquid eius esse omnis unde similique perspiciatis, quidem, tempore totam quaerat nostrum officia odit molestias dicta. ",
          price: 300,
          rating: 2,
          img: "book.jpg",
          authorId: 1,
          genreId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "book name 4",
          description:
            "Dolor harum veritatis aliquid eius esse omnis unde similique. Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
          price: 400,
          rating: 9,
          img: "book.jpg",
          authorId: 2,
          genreId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "book name 5",
          description:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor harum veritatis aliquid eius esse omnis unde similique perspiciatis, quidem, tempore totam quaerat nostrum officia odit molestias dicta. Perspiciatis, cupiditate quos?",
          price: 500,
          rating: 3,
          img: "book.jpg",
          authorId: 2,
          genreId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "BOOK 1",
          description:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis, cupiditate quos?",
          price: 100,
          rating: 5,
          img: "book.jpg",
          authorId: 1,
          genreId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "BOOK 2",
          description:
            "Dolor harum veritatis aliquid eius esse omnis unde similique perspiciatis, quidem, tempore totam quaerat nostrum officia odit molestias dicta. Perspiciatis, cupiditate quos?",
          price: 200,
          rating: 4,
          img: "book.jpg",
          authorId: 2,
          genreId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "BOOK 3",
          description:
            "Perspiciatis, cupiditate quos? Dolor harum veritatis aliquid eius esse omnis unde similique perspiciatis, quidem, tempore totam quaerat nostrum officia odit molestias dicta. ",
          price: 300,
          rating: 2,
          img: "book.jpg",
          authorId: 1,
          genreId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "BOOK 4",
          description:
            "Dolor harum veritatis aliquid eius esse omnis unde similique. Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
          price: 400,
          rating: 9,
          img: "book.jpg",
          authorId: 2,
          genreId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "BOOK 5",
          description:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor harum veritatis aliquid eius esse omnis unde similique perspiciatis, quidem, tempore totam quaerat nostrum officia odit molestias dicta. Perspiciatis, cupiditate quos?",
          price: 500,
          rating: 3,
          img: "book.jpg",
          authorId: 2,
          genreId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
