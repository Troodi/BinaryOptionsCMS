<ul class="menu-content">
    @if (isset($menu))
      @foreach ($menu as $submenu)
        <li {{(request()->is($submenu->url.'*')) ? 'class=active' : '' }}>
          <a href="@isset($submenu->url) {{asset($submenu->url)}} @endisset" @if(isset($submenu->newTab)){{"target=_blank"}}@endif>
            <i class="bx bx-right-arrow-alt"></i>
          <span class="menu-item">{{ __('locale.'.$submenu->name)}}</span>
          </a>
          @if(isset($submenu->submenu))
            @include('panels.sidebar-submenu',['menu'=>$submenu->submenu])
          @endif
        </li>
      @endforeach
    @endif
</ul>