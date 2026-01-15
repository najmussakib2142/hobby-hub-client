import LegalLayout from "../layouts/LegalLayout";

const PrivacyPolicy = () => (
  <LegalLayout title="Privacy Policy" lastUpdated="January 15, 2026">
    <section>
      <h2>1. Our Honest Approach</h2>
      <p>At HobbyHub, we believe your data belongs to you. We only collect information that is strictly necessary to connect you with hobby groups. We do not, and will never, sell your personal data to third-party advertisers.</p>
      
      <h2>2. Information We Collect</h2>
      <p>When you create an account, we store your name, email, and the hobby interests you share. This allows us to personalize your experience and notify you of new groups in your area.</p>
      
      <h2>3. How We Use Data</h2>
      <ul>
        <li>To manage your group memberships and account.</li>
        <li>To send platform-related updates (not spam).</li>
        <li>To improve the HobbyHub interface based on usage patterns.</li>
      </ul>
    </section>
  </LegalLayout>
);

export default PrivacyPolicy;