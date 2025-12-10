# ⏱️ DevTime Tracker

A minimal, developer-focused productivity timer that only counts _real_ focused work.

## 🚀 Project Goal

Developers often “work” for hours, but only a fraction of that time is actual deep work and usually hurt themselves by working too much.  
**DevTime Tracker** solves this by tracking _only the minutes you stay on that work and fully focused_.  
This tiny app solves one very real problem:

“How much time did I actually spend working today?”

This project was intentionally built as a **small, high-impact tool** to practice:

- shipping fast
- managing a micro project end-to-end
- improving React/Next.js skills
- improving focus & self-discipline

---

## 🎯 Features (v0.2)

✔️ Start a focus session with one click  
✔️ Timer keeps running even if you:  
• switch tabs  
• open VSCode or any other apps (for this version)  
• refresh the page  
• close and reopen the browser  
✔️ Time is stored in localStorage  
✔️ Clean minimal UI with Next.js + React + Tailwind  
✔️ Fully deployable as a micro-project  
✔️ Clean time formatting (HH:MM:SS)  
✔️ Reset timer via double-click or by holding  

---

## 🧩 Tech Stack

- **Next.js**
- **React Hooks**
- **TypeScript**
- **TailwindCSS**
- **LocalStorage API**

---

## 🧠 Key Problems Encountered (and Solutions)

## 1. Timer resets after page refresh

We encountered this error:

**Cause:**
`Reloading` the page erased all progress.

**Solution:**
Save only the start timestamp:

```ts
localStorage.setItem("focusStart", Date.now());
```

On load, reconstruct elapsed time:

```ts
(Date.now() - storedStart) / 1000;
```

### 2. ❌ `setInterval` typing error with TypeScript

We encountered this error:

**Cause:**  
`Node.js` and browsers return different interval types.  
`setInterval` in Node returns a `Timeout` object, not a number.

**Solution:**  
Use a union type:

```ts
let interval : <number | null> = null;
```

Now the type is number or null.

### 3. ❌ clearInterval() complaining about type mismatch

We encountered this one:

**Cause:**
You cannot pass `null` into `clearInterval()`.

**solution:**
By using an simple If:

```ts
if (interval !== null) {
  clearInterval(intervalRef.current);
}
```
---
## 🔮 Future Version (Smart Focus Mode)

<p style="color:green; text-align:center">
**Auto-Pause on distraction websites (YouTube, TikTok, Instagram)**

**Auto-Resume on productive sites (GitHub, StackOverflow)**

**Configurable domain rules (JSON)**

**Optional Chrome Extension**

**Daily productivity report**
</p>

## ❤️ Credits

1. Created as part of a micro-project challenge to improve:

2. execution skill

3. finishing ability

4. project management

5. real-world problem solving

<hr style="height: 5px; border: none; background: linear-gradient(to right, #f00, #00f);">
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
