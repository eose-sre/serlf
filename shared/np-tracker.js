/**
 * NP (Novel Pattern) Tracker
 * Manages user's exploration progress, points, and discoveries.
 * Data is stored in localStorage under the 'serlf_np_progress' key.
 */

class NPTracker {
    constructor() {
        this.storageKey = 'serlf_np_progress';
        this.progress = this.loadProgress();
        this.milestones = [
            { points: 100, badge: "Explorer", reward: null },
            { points: 500, badge: "Explorer", reward: "Free Captain question" },
            { points: 1000, badge: "Pattern Finder", reward: "1 month free store" },
            { points: 5000, badge: "Meek Master", reward: "Mall Pass discount" }
        ];
        this.actionPoints = {
            'visit_store': 5,
            'ask_marketplace_cap': 10,
            'ask_captain': 25,
            'complete_tutorial': 50,
            'find_hidden_pattern': 100
        };
        // Mock list of all discoverable NPs
        this.allNPs = [
            { id: 'NP-L1-162', name: 'Pay-to-Ask Tiering', category: 'Economy', impact: 4 },
            { id: 'NP-L1-163', name: 'Mutual Learning Loop', category: 'Core Concept', impact: 5 },
            { id: 'NP-L1-164', name: 'NP-as-Gamification', category: 'Engagement', impact: 3 },
            { id: 'NP-L1-165', name: 'Marketplace Cap Pattern', category: 'AI', impact: 4 },
            { id: 'NP-L1-166', name: 'Captain Economy', category: 'Economy', impact: 3 },
            { id: 'NP-L1-167', name: 'Email-as-Identity Federation', category: 'Identity', impact: 2, hidden: true },
            { id: 'NP-L1-168', name: 'Exploration Revenue', category: 'Economy', impact: 3, hidden: true }
        ];
    }

    loadProgress() {
        try {
            const data = localStorage.getItem(this.storageKey);
            if (data) {
                return JSON.parse(data);
            }
        } catch (error) {
            console.error("Error loading NP progress from localStorage:", error);
        }
        // Default structure if nothing is stored yet
        return {
            points: 0,
            discoveredNPs: ['NP-L1-162'], // Start with one unlocked
            unlockedMilestones: [],
            log: []
        };
    }

    saveProgress() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.progress));
        } catch (error) {
            console.error("Error saving NP progress to localStorage:", error);
        }
    }

    trackAction(action, metadata = {}) {
        const points = this.actionPoints[action];
        if (points) {
            this.progress.points += points;
            this.progress.log.push({ action, points, metadata, timestamp: new Date().toISOString() });
            console.log(`Awarded ${points} NP for action: ${action}`);
            this.checkMilestones();
            this.saveProgress();
            return true;
        }
        console.warn(`Unknown action: ${action}`);
        return false;
    }

    getPoints() {
        return this.progress.points;
    }

    getLevel() {
        const currentPoints = this.getPoints();
        let currentBadge = "Novice";
        for (let i = this.milestones.length - 1; i >= 0; i--) {
            if (currentPoints >= this.milestones[i].points) {
                currentBadge = this.milestones[i].badge;
                break;
            }
        }
        return currentBadge;
    }

    getDiscoveries() {
        return this.allNPs.map(np => ({
            ...np,
            discovered: this.progress.discoveredNPs.includes(np.id)
        }));
    }

    unlockNP(npId) {
        if (!this.allNPs.find(np => np.id === npId)) {
            console.warn(`NP with id ${npId} does not exist.`);
            return false;
        }
        if (!this.progress.discoveredNPs.includes(npId)) {
            this.progress.discoveredNPs.push(npId);
            // Award points for finding a pattern
            this.trackAction('find_hidden_pattern', { npId });
            this.saveProgress();
            console.log(`Unlocked NP: ${npId}`);
            return true;
        }
        return false;
    }

    checkMilestones() {
        const currentPoints = this.getPoints();
        this.milestones.forEach(milestone => {
            if (currentPoints >= milestone.points && !this.progress.unlockedMilestones.includes(milestone.points)) {
                this.progress.unlockedMilestones.push(milestone.points);
                console.log(`Milestone reached: ${milestone.reward || milestone.badge}`);
                // In a real app, this would trigger a notification or event.
                // For now, we just log it.
            }
        });
    }

    getLeaderboard() {
        // Mock data for demonstration purposes
        return [
            { rank: 1, name: "Meek Master M.", points: 7250 },
            { rank: 2, name: "Cap'n Explorer", points: 6100 },
            { rank: 3, name: "You", points: this.getPoints() },
            { rank: 4, name: "Pattern Seeker", points: 4800 },
            { rank: 5, name: "Curious Coder", points: 3250 },
            { rank: 6, name: "Just Browsing", points: 150 }
        ].sort((a, b) => b.points - a.points);
    }
    
    // For testing/demo purposes
    resetProgress() {
        localStorage.removeItem(this.storageKey);
        this.progress = this.loadProgress();
        console.log("NP progress has been reset.");
    }
}

// Export for use in other scripts
// In a module context, you would use `export default NPTracker;`
// For simple script inclusion, we can instantiate it on the window object.
window.npTracker = new NPTracker();
