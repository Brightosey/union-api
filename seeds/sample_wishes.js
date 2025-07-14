/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("wishes").del();

  // Inserts sample entries
  await knex("wishes").insert([
    {
      name: "Bright",
      message: "Wishing you a lifetime of joy and love! 💖",
      gif_url: "https://media.giphy.com/media/l4FGGafcOHmrlQxG0/giphy.gif",
      likes: 2,
    },
    {
      name: "Essie",
      message: "May your union shine brighter than the stars ✨",
      gif_url: "https://media.giphy.com/media/3o7abldj0b3rxrZUxW/giphy.gif",
      likes: 5,
    },
    {
      name: "Dayo",
      message: "To forever and always 💍",
      gif_url: null,
      likes: 0,
    },
  ]);
};
