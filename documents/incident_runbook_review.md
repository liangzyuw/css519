# Runbook Review and Thoughts - May 31st, 2026

## Current Runbook Steps and Range
The runbook currently only addresses a couple possible security incidents, though they are the most likely to occur. For users who have a basic understanding of API management and containers, the runbook should be easy to understand and follow through with. The steps are generally clear for users who have at least some experience with REST APIs, authentication, authorization, and Docker containers.  

The runbook provides enough detail to identify issues through the dashboard, CI/CD pipeline, and security tests. In addition, users can verify it using API requests and perform basic containment actions such as stopping or restarting services. Overall, its useful for the current mock deployment, but it should be expanded as the system gains more features and more possible incident types.

## Simplification
With more identified incidents, I believe the runbook would need to be expanded to cover all the necessary situations. These incidents include failed login spikes, rate-limiting events, suspicious student comment submissions, or service availability failures. However, in future development, the runbook should be simplified in terms of unnecessary terminalogy or rephrasing of certain steps. This would reduce the lengthiness and improve readability, making it more accessible for anyone to use. For instance, some steps could be rewritten in shorter and more direct words, especially for users who may not be deeply familiar with security operations.

## Further Automation
### Currently, the runbook directs users to the dashboard to view:
- Automated increases in unauthorized requests
- Automated recent security event detection
- Automated updates in changes in data model

### Future automation:
- alert when repeated unauthorized annotation requests
- alert when failed login attempts occur

### Manual supplementation:
- containment steps such as temporarily blocking a suspicious IP address or disabling a compromised account
- the dashboard can detect that an unauthorized request occurred, but humans should still determine whether it was a harmless test or a real attack
- restarting containers or rotating credentials should require manual confirmation to avoid disrupting legitimate users unnecessarily