import { INITIAL_BALANCE } from '../economyConfig';
import { calculateNewBalance, canAfford } from '../transactionRules';
import { isValidAmount, getArtifactValue } from '../economyUtils';
import { useEconomyStore } from '../../../store/useEconomyStore';
import { ArtifactType, Material, Era, Rarity, HistoricalValue } from '../../artifacts/artifactTypes';
import type { Artifact } from '../../artifacts/artifactTypes';

function runTests() {
  let passed = 0;
  let failed = 0;
  
  function assert(condition: boolean, message: string) {
    if (condition) {
      console.log(`[PASS] ${message}`);
      passed++;
    } else {
      console.error(`[FAIL] ${message}`);
      failed++;
    }
  }

  // 1. Starting balance
  assert(INITIAL_BALANCE === 100000, 'Starting balance is 100000');

  // 2. Deposit
  assert(calculateNewBalance(100000, 10000, false) === 110000, 'Deposit 10000 adds to balance');

  // 3. Withdraw
  assert(calculateNewBalance(110000, 25000, true) === 85000, 'Withdraw 25000 subtracts from balance');

  // 4. canAfford true
  assert(canAfford(85000, 20000) === true, 'canAfford returns true if balance >= cost');

  // 5. canAfford false
  assert(canAfford(85000, 100000) === false, 'canAfford returns false if balance < cost');

  // 6. Withdrawal greater than balance fails
  let threw = false;
  try {
    calculateNewBalance(5000, 10000, true);
  } catch {
    threw = true;
  }
  assert(threw, 'Withdrawal greater than balance throws error');

  // 7. Failed withdrawal does not modify balance
  const store = useEconomyStore.getState();
  store.resetEconomy();
  const res = store.withdraw(200000, 'EQUIPMENT', 'Test');
  assert(res === false && store.balance === INITIAL_BALANCE, 'Failed withdrawal does not modify store balance');

  // 8. Zero amount rejected
  assert(isValidAmount(0) === false, 'Zero amount is invalid');

  // 9. Negative amount rejected
  assert(isValidAmount(-500) === false, 'Negative amount is invalid');

  // 10. Decimal amount rejected
  assert(isValidAmount(100.5) === false, 'Decimal amount is invalid');

  // 11. Successful transactions create exactly one transaction record
  store.resetEconomy();
  store.deposit(5000, 'FUNDING', 'Test Deposit');
  assert(useEconomyStore.getState().transactions.length === 1, 'Successful transaction creates 1 record');
  assert(useEconomyStore.getState().transactions[0].amount === 5000, 'Transaction record has correct amount');
  assert(useEconomyStore.getState().transactions[0].direction === 'INCOME', 'Transaction record has correct direction');

  // 12. Failed transactions create no successful transaction
  store.withdraw(9999999, 'EQUIPMENT', 'Impossible');
  assert(useEconomyStore.getState().transactions.length === 1, 'Failed transaction creates no record');

  // 13. Artifact valuation returns its deterministic marketValue
  const dummyArtifact: Artifact = {
    id: 'test_art', name: 'Test', type: ArtifactType.Coin, material: Material.Gold,
    era: Era['Unknown'], rarity: Rarity.Common, condition: 100, preservationStatus: 'Good',
    discoveryLocation: 'Test', excavationLayer: 'Test', discoveryMethod: 'Test',
    discoveredBy: 'Test', historicalValue: HistoricalValue.Low, marketValue: 12345
  };
  assert(getArtifactValue(dummyArtifact) === 12345, 'Artifact valuation returns marketValue');

  // 14. Artifact valuation does not mutate the artifact
  assert(dummyArtifact.marketValue === 12345, 'Artifact valuation does not mutate artifact');

  // 15. resetEconomy returns exactly to the initial state
  store.resetEconomy();
  assert(useEconomyStore.getState().balance === INITIAL_BALANCE, 'resetEconomy restores INITIAL_BALANCE');
  assert(useEconomyStore.getState().transactions.length === 0, 'resetEconomy clears transactions');

  console.log(`\nTests completed: ${passed} passed, ${failed} failed.`);
}

runTests();
