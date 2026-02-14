// ========== serlf Auth Module ==========
// Supabase-powered auth + account management
// Config: set SUPABASE_URL and SUPABASE_ANON_KEY when ready

const SUPABASE_URL = ''; // TODO: set after Supabase project created
const SUPABASE_ANON_KEY = ''; // TODO: set after Supabase project created

let supabase = null;
let currentUser = null;

// ========== INIT ==========
function initAuth() {
    if (SUPABASE_URL && SUPABASE_ANON_KEY && window.supabase) {
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        supabase.auth.onAuthStateChange((event, session) => {
            currentUser = session?.user || null;
            updateAuthUI();
            if (event === 'SIGNED_IN') loadAccount();
        });
        // Check existing session
        supabase.auth.getSession().then(({ data }) => {
            currentUser = data.session?.user || null;
            updateAuthUI();
            if (currentUser) loadAccount();
        });
    }
}

// ========== AUTH ACTIONS ==========
async function signUp(email, password, name) {
    if (!supabase) return mockAuth('signup', email, name);
    const { data, error } = await supabase.auth.signUp({
        email, password,
        options: { data: { name } }
    });
    if (error) throw error;
    return data;
}

async function signIn(email, password) {
    if (!supabase) return mockAuth('signin', email);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
}

async function signInWithProvider(provider) {
    if (!supabase) return mockAuth('oauth', provider);
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo: window.location.origin }
    });
    if (error) throw error;
    return data;
}

async function signOut() {
    if (!supabase) {
        currentUser = null;
        localStorage.removeItem('serlf_mock_user');
        updateAuthUI();
        window.location.hash = '#/';
        return;
    }
    await supabase.auth.signOut();
    currentUser = null;
    updateAuthUI();
    window.location.hash = '#/';
}

async function resetPassword(email) {
    if (!supabase) return alert('Password reset will work once Supabase is connected.');
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/#/account'
    });
    if (error) throw error;
}

// ========== ACCOUNT ==========
let accountData = null;

async function loadAccount() {
    if (!supabase || !currentUser) return;
    const { data } = await supabase.from('accounts')
        .select('*, subscriptions(*, products(*))')
        .eq('id', currentUser.id)
        .single();
    accountData = data;
}

function getAccountTier() {
    if (accountData?.tier) return accountData.tier;
    return 'free';
}

// ========== MOCK AUTH (pre-Supabase) ==========
function mockAuth(action, email, name) {
    const mockUser = {
        id: 'mock-' + Date.now(),
        email: email || 'demo@serlf.ca',
        user_metadata: { name: name || email?.split('@')[0] || 'Demo User' }
    };
    currentUser = mockUser;
    localStorage.setItem('serlf_mock_user', JSON.stringify(mockUser));
    updateAuthUI();
    window.location.hash = '#/account';
    return { user: mockUser };
}

function loadMockUser() {
    const stored = localStorage.getItem('serlf_mock_user');
    if (stored) {
        currentUser = JSON.parse(stored);
        updateAuthUI();
    }
}

// ========== UI ==========
function updateAuthUI() {
    const loginBtn = document.getElementById('loginBtn');
    if (!loginBtn) return;
    if (currentUser) {
        const name = currentUser.user_metadata?.name || currentUser.email?.split('@')[0] || 'Account';
        loginBtn.textContent = name;
        loginBtn.href = '#/account';
    } else {
        loginBtn.textContent = 'Sign In';
        loginBtn.href = '#/login';
    }
}

function isLoggedIn() { return !!currentUser; }
function getUser() { return currentUser; }
