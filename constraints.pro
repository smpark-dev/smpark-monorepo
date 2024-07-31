% 공통 패키지 목록 정의
common_packages(['typescript']).

% 의존성 규칙 설정
gen_enforced_dependency(WorkspaceCwd, Package, Version, DependencyType) :-
  % 공통 패키지 목록 가져오기
  common_packages(Packages),
  
  % 현재 패키지가 공통 패키지 목록에 있는지 확인
  member(Package, Packages),
  
  % 루트 워크스페이스에서 패키지 버전 가져오기
  workspace_has_dependency('.', Package, RootVersion, _),
  
  % 모든 워크스페이스에 패키지 추가
  (
    % 루트 워크스페이스인 경우 원래 버전 유지
    WorkspaceCwd == '.' -> Version = RootVersion
    % 서브 프로젝트인 경우 루트의 버전으로 설정
    ; Version = RootVersion
  ),
  
  % 의존성 타입 설정 (예: devDependencies로 통일)
  DependencyType = devDependencies.