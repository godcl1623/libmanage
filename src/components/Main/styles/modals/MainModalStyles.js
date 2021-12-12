const modalOption = (origin, isMobile, isPortrait, flex) => `
  position: absolute;
  width: ${
    origin !== 'Header_MemInfo'
      ? origin.split('-')[0] === 'meta'
          ? '70vw'
          : '50%'
      : '45%'
  };
  height: ${
    origin !== 'Header_MemInfo'
      ? origin.split('-')[0] === 'meta'
        ? `${(70 * 9) / 16}vw`
        : '50%'
      : 'max-content'
  };
  ${flex.vertical}
  background: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;

  @media (max-width: 1079px) {
    height: ${
      origin !== 'Header_MemInfo'
        ? origin.split('-')[0] === 'meta'
          ? `${(70 * 9) / 16}vw`
          : '50%'
        : 'max-content'
    };
  }

  @media (max-width: 720px) and (min-height: 300px) {
    width: ${
      origin !== 'Header_MemInfo'
        ? origin.split('-')[0] === 'meta'
            ? '70vw'
            : '50%'
        : '45%'
    };
    height: ${
      origin !== 'Header_MemInfo'
        ? origin.split('-')[0] === 'meta'
          ? `${(70 * 9) / 16}vw`
          : '50%'
        : 'max-content'
    };
  }

  @media (max-width: 720px) and (max-height: 299px) {
    width: ${
      origin !== 'Header_MemInfo'
        ? origin.split('-')[0] === 'meta'
            ? '70vw'
            : '50%'
        : '45%'
    };
    height: ${
      origin !== 'Header_MemInfo'
        ? origin.split('-')[0] === 'meta'
          ? `${(70 * 9) / 16}vw`
          : '50%'
        : 'max-content'
    };
  }

  @media (orientation: portrait) {
    width: ${
      origin !== 'Header_MemInfo'
        ? origin.split('-')[0] === 'meta'
            ? '90vw'
            : '50%'
        : '45%'
    };
    height: ${
      origin !== 'Header_MemInfo'
        ? origin.split('-')[0] === 'meta'
          ? `${(90 * 9) / 16}vw`
          : '30%'
        : 'max-content'
    };

    @media (max-width: 1079px) {
      width: ${
        origin !== 'Header_MemInfo'
          ? origin.split('-')[0] === 'meta'
              ? '90vw'
              : '50%'
          : '45%'
      };
      height: ${
        origin !== 'Header_MemInfo'
          ? origin.split('-')[0] === 'meta'
            ? `${(90 * 9) / 16}vw`
            : '30%'
          : 'max-content'
      };
    }

    @media (max-width: 720px) {
      width: ${
        origin !== 'Header_MemInfo'
          ? origin.split('-')[0] === 'meta'
              ? '70vw'
              : '50%'
          : '45%'
      };
      height: ${
        origin !== 'Header_MemInfo'
          ? origin.split('-')[0] === 'meta'
            ? `${(70 * 9) / 16}vw`
            : '30%'
          : 'max-content'
      };
    }

    @media (max-width: 599px) {
      width: ${
        origin !== 'Header_MemInfo'
          ? origin.split('-')[0] === 'meta'
              ? isPortrait && isMobile
                  ? `${(90 * 16) / 9}vw`
                  : '70vw'
              : '90%'
          : '90%'
      };
      height: ${
        origin !== 'Header_MemInfo'
          ? origin.split('-')[0] === 'meta'
            ? isPortrait && isMobile
                ? '90vw'
                : `${(70 * 9) / 16}vw`
            : '50%'
          : 'max-content'
      };
      transform:
        translate(-50%, -50%)
        ${origin.split('-')[0] === 'meta' ? 'rotate(90deg)' : ''};
    }

    @media (max-width: 299px) {
      height: ${
        origin !== 'Header_MemInfo'
          ? origin.split('-')[0] === 'meta'
            ? isPortrait && isMobile
                ? '90vw'
                : `${(70 * 9) / 16}vw`
            : 'max-content'
          : 'max-content'
      };
    }
  }
`;

export default modalOption;