// auth.js — localStorage auth (Supabase-ready)
const SerlfAuth = (() => {
  const STORAGE_KEY = 'serlf_user';

  function getUser() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch { return null; }
  }

  function setUser(user) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...user, lastLogin: Date.now() }));
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY);
    window.location.href = 'login.html';
  }

  function requireAuth() {
    const u = getUser();
    if (!u) { window.location.href = 'login.html'; return null; }
    return u;
  }

  function signup({ email, name, domain }) {
    return new Promise(resolve => {
      setTimeout(() => {
        const user = {
          id: 'usr_' + Math.random().toString(36).slice(2, 10),
          email, name, domain,
          createdAt: Date.now(),
          paid: true,
          ownedProducts: [],
          xp: 0,
          achievements: [],
          cart: [],
          specialistMet: false
        };
        setUser(user);
        resolve(user);
      }, 800);
    });
  }

  function login(email) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const u = getUser();
        if (u && u.email === email) { u.lastLogin = Date.now(); setUser(u); resolve(u); }
        else if (email.includes('@')) {
          const user = { id: 'usr_' + Math.random().toString(36).slice(2, 10), email, name: email.split('@')[0], domain: 'net', createdAt: Date.now(), paid: true, ownedProducts: [], xp: 0, achievements: [], cart: [], specialistMet: false };
          setUser(user); resolve(user);
        } else reject(new Error('Invalid email'));
      }, 600);
    });
  }

  function updateUser(updates) {
    const u = getUser();
    if (!u) return null;
    Object.assign(u, updates);
    setUser(u);
    return u;
  }

  return { getUser, setUser, logout, requireAuth, signup, login, updateUser };
})();
