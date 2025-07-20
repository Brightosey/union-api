export async function seed(knex) {
  await knex("wishes").del();

  await knex("wishes").insert([
    {
      name: "Bright",
      message: "Congratulations!",
      gif_url: "https://media.giphy.com/media/l4FGuhL4U2WyjdkaY/giphy.gif",
      likes: 0,
    },
    {
      name: "Essie",
      message: "Wishing you all the best!",
      gif_url: "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif",
      likes: 0,
    },
  ]);
}
