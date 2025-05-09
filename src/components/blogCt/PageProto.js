import PageHeader from "./PageHeader";

export default function PageProto () {
  return (
    <div className="main-content">
      <div className="container">
        <PageHeader 
          title="Oslo" 
          subtitle="Mauris cursus mattis molestie a iaculis at erat pellentesque adipiscing. Netus et malesuada fames ac turpis egestas integer eget. A diam maecenas sed enim ut sem."
        />
        
        <div className="oslo-content">
          <img src="/images/oslo-interior.jpg" alt="Oslo Interior" className="oslo-header-image" />
          
          <div className="oslo-grid">
            <div className="oslo-text">
              <h2>Norwegian Interior Design</h2>
              <p>Mauris cursus mattis molestie a iaculis at erat pellentesque adipiscing. Netus et malesuada fames ac turpis egestas integer eget. A diam maecenas sed enim ut sem viverra aliquet eget. Vel fringilla est ullamcorper eget nulla facilisi etiam. Velit egestas dui id ornare arcu odio ut. Felis donec et odio pellentesque diam volutpat commodo sed egestas. Auctor eu augue ut lectus arcu bibendum at varius. Rhoncus mattis rhoncus urna neque viverra justo nec ultrices.</p>
              <p>Aenean euismod elementum nisi quis eleifend. Vitae purus faucibus ornare suspendisse sed nisi lacus. Mattis enim ut tellus elementum sagittis. Lectus quam id leo in vitae turpis. Lobortis scelerisque fermentum dui faucibus in ornare quam.</p>
              <p>Proin fermentum leo vel orci porta non pulvinar. Diam phasellus vestibulum lorem sed risus ultricies. Quisque egestas diam in arcu cursus. Morbi tincidunt ornare massa eget egestas. Scelerisque eu ultrices vitae auctor eu.</p>
            </div>
          </div>
          
          <div className="rooms-link">
            <a href="/rooms" className="help-link">ROOMS</a>
          </div>
        </div>
      </div>
    </div>
  );
};