import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CameraScanPanel } from "@/components/camera-scan-panel";

describe("CameraScanPanel", () => {
  test.skip(
    "TODO: alunos - ativar quando a captura pela camera estiver implementada",
    async () => {
      const user = userEvent.setup();

      render(<CameraScanPanel />);

      await user.click(
        screen.getByRole("button", { name: /escanear nota fiscal/i }),
      );

      expect(
        screen.getByText(/painel reservado para captura da nota fiscal/i),
      ).toBeInTheDocument();
    },
  );
});
