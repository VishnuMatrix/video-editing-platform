# React + Vite

## Homepage media uploads

The admin Homepage Videos editor uploads hero, gallery, archive, poster, and frame-viewer media directly to Cloudinary. Configure these Vite environment variables in `.env`:

```env
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_unsigned_upload_preset
```

Create an **unsigned** upload preset in the Cloudinary console and restrict its allowed formats, size, and folder as appropriate. The browser upload uses the Cloudinary cloud name and preset only; never put an API secret in a `VITE_` variable. Restart the Vite server after changing `.env`. Uploaded `secure_url` values are saved in the public-readable `homepageContent/home` Firestore document when an admin publishes changes.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
