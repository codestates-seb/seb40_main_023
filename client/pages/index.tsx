import Head from "next/head";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Countdown from "../components/main/Countdown";
import Section from "../components/main/Section";
import SectionTitle from "../components/main/SectionTitle";
import ServiceIntro from "../components/main/ServiceIntro";
import ServiceHowto from "../components/main/ServiceHowto";
import ServiceChart from "../components/main/ServiceChart";
import ServiceReview from "../components/main/ServiceReview";
import ServiceGallery from "../components/main/ServiceGallery";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div>
      <Head>
        <title>새해 복망고</title>
        <meta
          name="description"
          content="코드스테이츠 애플망고팀의 메인 프로젝트 새해복망고 페이지입니다."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <aside>
        <Sidebar />
      </aside>
      <main className="pt-[58px]">
        <Section>
          <Countdown />
          <SectionTitle
            title={`새해 복망고로 따뜻한\n새해 인사를 전해보세요!`}
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
