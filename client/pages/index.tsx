import Header from "../components/header";
import Sidebar from "../components/sidebar";
import Countdown from "../components/main/info/Countdown";
import Section from "../components/main/Section";
import SectionTitle from "../components/main/SectionTitle";
import ServiceIntro from "../components/main/info/ServiceIntro";
import ServiceHowto from "../components/main/howto/ServiceHowto";
import ServiceChart from "../components/main/chart/ServiceChart";
import ServiceReview from "../components/main/review/ServiceReview";
import ServiceGallery from "../components/main/gallery/ServiceGallery";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div>
      <Header />
      <main className="pt-[58px]">
        <Section>
          <Countdown />
          <SectionTitle
            title={`새해복망고로 따뜻한\n 새해 인사를 전해보세요!`}
          />
          <ServiceIntro />
        </Section>
        <Section color={true}>
          <SectionTitle title={`새해 복 망고 어떻게 만드나요?`} />
          <ServiceHowto />
        </Section>
        <Section>
          <SectionTitle
            title={`이렇게 많은 분들이 복망고에서\n덕담을 나누고 있어요`}
          />
          <ServiceChart />
        </Section>
        <Section color={true}>
          <SectionTitle title={`새해 복망고 찐후기`} />
          <ServiceReview />
        </Section>
        <Section>
          <SectionTitle title={`새해 복망고 갤러리`} />
          <ServiceGallery />
        </Section>
      </main>
      <Footer />
    </div>
  );
}
