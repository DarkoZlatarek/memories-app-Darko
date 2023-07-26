import { rest } from "msw"

const baseUrl = "https://djangorestframework-darko-070f41296928.herokuapp.com/"

export const handlers = [
  rest.get(`${baseUrl}dj-rest-auth/user/`, (req, res, ctx) => {
    return res(
      ctx.json({
        pk: 4,
        username: "Darko",
        email: "",
        first_name: "",
        last_name: "",
        profile_id: 3,
        profile_image:
          "https://res.cloudinary.com/dcqcddsyx/image/upload/v1/media/../default_profile_muvyn4",
      })
    );
  }),
  rest.post(`${baseUrl}dj-rest-auth/logout/`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];