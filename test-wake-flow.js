// Mock localStorage for Node.js environment
class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock();

const { orchestrateFirstMeet, DOMAIN_CAPTAINS, PRODUCT_SPECIALISTS } = require('./shared/specialist-profiles.js');

const testUser = {
  userName: 'Test User',
  userId: 'test-user-123',
};

const specialistToTest = PRODUCT_SPECIALISTS[0].id;

console.log('--- Testing Specialist Wake Flow ---');

Object.keys(DOMAIN_CAPTAINS).forEach(domain => {
  console.log(`\n--- Testing Domain: serlf.${domain} ---`);
  const steps = orchestrateFirstMeet(testUser.userName, testUser.userId, specialistToTest, domain);
  if (steps && steps.length > 0) {
    console.log('✅ Wake flow orchestration successful.');
    steps.forEach((step, index) => {
      console.log(`  Step ${index + 1}: [${step.sender}] ${step.message}`);
    });
  } else {
    console.log('❌ Wake flow orchestration failed.');
  }
});
