# Simple Smart Contract Project

This project demonstrates a basic smart contract that allows users to deposit and withdraw money from their connected crypto wallet. The tech stack used includes Solidity for smart contract development, Next.js for the frontend, and Hardhat for testing and deployment.

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- VS Code or any other code editor
- MetaMask extension for your browser

### Installation

1. **Clone the repository:**

    ```bash
    git clone <your-repo-url>
    cd <your-repo-directory>
    ```

2. **Install dependencies:**

    In the project directory, open a terminal and type:

    ```bash
    npm i
    ```

### Running the Project

To get the project up and running, you'll need to open three terminals in your VS Code or any other terminal you prefer.

1. **First Terminal:**

    This terminal will be used to install dependencies and run the frontend.

    ```bash
    npm i
    npm run dev
    ```

2. **Second Terminal:**

    This terminal will run the Hardhat local blockchain node.

    ```bash
    npx hardhat node
    ```

3. **Third Terminal:**

    This terminal will deploy the smart contract to the local blockchain.

    ```bash
    npx hardhat run --network localhost scripts/deploy.js
    ```

### Accessing the Frontend

Once you have the above steps running:

1. Open your browser and navigate to `http://localhost:3000`
2. Connect your MetaMask wallet to the local Hardhat network
3. You should now be able to interact with the smart contract through the frontend interface.

## Project Structure

- **contracts/**: Contains the Solidity smart contract code.
- **scripts/**: Contains the deployment script for the smart contract.
- **pages/**: Contains the Next.js pages for the frontend.
- **public/**: Contains static assets for the frontend.
- **styles/**: Contains CSS files for styling the frontend.

## Useful Commands

- Compile the smart contracts:

    ```bash
    npx hardhat compile
    ```

- Run tests:

    ```bash
    npx hardhat test
    ```

- Deploy contracts to a specific network:

    ```bash
    npx hardhat run --network <network-name> scripts/deploy.js
    ```
## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.