import { api } from "../lib/api";
import { getLocale } from "../lib/i18n";
import PageWrapper from "../components/PageWrapper";

export default async function PrivacyPolicyPage() {
  const locale = await getLocale();
  const slug = `privacy-policy-${locale}`;

  let page = {
    title: locale === "fr" ? "Politique de confidentialité" : "Privacy Policy",
    content: "",
  };
  try {
    page = await api.pages.getBySlug(slug);
  } catch {
    // not yet created in admin
  }

  return (
    <PageWrapper>
      <div className="px-4 sm:px-8 lg:px-24 py-12">
        <h1 className="text-3xl font-bold text-white mb-8">{page.title}</h1>
        {page.content ? (
          <div className="text-[#aaa] text-sm leading-relaxed whitespace-pre-wrap">
            {page.content}
          </div>
        ) : (
          <p className="text-[#555] text-sm">Content coming soon.</p>
        )}
      </div>
    </PageWrapper>
  );
}
