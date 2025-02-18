### Vicinu

Frappe Framework backend for the Vicinu mobile app – a platform for fruit sharing and reducing food waste.

### Prerequisits
Frappe Framework local environment: Follow the [official installation](https://docs.frappe.io/framework/user/en/installation) guide to set up Frappe on your system.

### Installation

You can install this app using the [bench](https://github.com/frappe/bench) CLI:

```bash
cd $PATH_TO_YOUR_BENCH
bench get-app $URL_OF_THIS_REPO --branch develop
bench install-app vicinu
```

### Contributing

This app uses `pre-commit` for code formatting and linting. Please [install pre-commit](https://pre-commit.com/#installation) and enable it for this repository:

```bash
cd apps/vicinu
pre-commit install
```

Pre-commit is configured to use the following tools for checking and formatting your code:

- ruff
- eslint
- prettier
- pyupgrade

### License

mit
